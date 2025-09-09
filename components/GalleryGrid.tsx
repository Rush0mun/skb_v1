"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const galleryImages = [
  {
    src: '/gallery/image1.jpg',
    alt: 'Karate Training Session',
  },
  {
    src: '/gallery/image2.jpg',
    alt: 'Championship Event',
  },
  {
    src: '/gallery/image3.jpg',
    alt: 'Belt Grading Ceremony',
  },
  // Add more images as needed
];

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>('');

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => {
              setSelectedImage(image.src);
              setSelectedAlt(image.alt);
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform hover:scale-110"
            />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="sr-only">{selectedAlt}</DialogTitle>
          {selectedImage && (
            <div className="relative aspect-video">
              <Image
                src={selectedImage}
                alt={selectedAlt}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}