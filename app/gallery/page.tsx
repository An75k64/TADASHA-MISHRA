import { Container } from "@/components/container";
import { galleryImages } from "@/lib/site-data";
import { VisualDiaryGallery } from "./visual-diary-gallery";

export default function GalleryPage() {
  return (
    <Container className="py-20 lg:py-24">
      <VisualDiaryGallery images={galleryImages} />
    </Container>
  );
}
