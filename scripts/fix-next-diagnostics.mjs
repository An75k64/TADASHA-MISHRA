import fs from "node:fs";
import path from "node:path";

/**
 * Work around Windows `EINVAL: invalid argument, readlink` errors when `.next`
 * contains reparse-point directories (junctions/OneDrive placeholders).
 *
 * Some tools call `fs.readlink()` on these paths and fail on Windows. We
 * normalize them to regular directories before `next dev/start`.
 */

const nextDir = path.join(process.cwd(), ".next");

function isSymlink(pathname) {
  try {
    fs.readlinkSync(pathname);
    return true;
  } catch {
    return false;
  }
}

function normalizeDirectory(pathname) {
  try {
    const stats = fs.lstatSync(pathname);
    if (!stats.isDirectory()) return false;
    if (isSymlink(pathname)) return false;

    // Many reparse points show up as directories but throw on readlink.
    // Replacing them with real directories avoids downstream `readlink` calls.
    fs.rmSync(pathname, { recursive: true, force: true });
    fs.mkdirSync(pathname, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

function walkDirectories(root) {
  const queue = [root];
  while (queue.length) {
    const current = queue.shift();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const full = path.join(current, entry.name);

      // Normalize first, then continue walking (directory exists either way).
      const changed = normalizeDirectory(full);
      if (changed) process.stdout.write(`Fixed ${path.relative(process.cwd(), full)}\n`);

      queue.push(full);
    }
  }
}

try {
  if (fs.existsSync(nextDir)) {
    // Normalize known hot spots and then walk the tree.
    normalizeDirectory(path.join(nextDir, "diagnostics"));
    normalizeDirectory(path.join(nextDir, "server"));
    walkDirectories(nextDir);
  }
} catch {
  // Best-effort.
}
