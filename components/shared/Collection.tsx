"use client"

import React from 'react'
import { Search } from './Search'
import { IImage } from '../../lib/database/models/image.model'
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import Image from 'next/image';
import { transformationTypes } from '../../constants';
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Button } from '../ui/button';
import { formUrlQuery } from '../../lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export const Collection = ({
    hasSearch = false,
    images,
    totalPages = 1,
    page
}: {
    images: IImage[];
    totalPages?: number;
    page: number;
    hasSearch?: boolean;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const onPageChange = (action: string) => {
        const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

        const newUrl = formUrlQuery({
            searchParams: searchParams.toString(),
            key: "page",
            value: pageValue,
          });
      
          router.push(newUrl, { scroll: false });     }

    return (
        <>
            <div className='collection-heading'>
                <h2 className='h2-bold text-dark-600'>Recent Edits</h2>
                {hasSearch && <Search />}
            </div>
            {images.length > 0 ? (
                <ul className='collection-list'>
                    {images.map((image) => (
                        <Card image={image} key={image._id} />
                    ))}
                </ul>
            ) : (
                <div className="collection-empty">
                    <p className="p-20-semibold">
                        Empty List
                    </p>
                </div>
            )}
            {totalPages > 1 && (
                <Pagination className='mt-10'>
                    <PaginationContent className='flex w-full'>
                        <Button
                            className="collection-btn"
                            onClick={() => onPageChange("prev")}
                            disabled={Number(page) <= 1}
                        >
                            <PaginationPrevious className='hover:bg-transparent hover:text-white' />
                        
                        </Button>

                        <p className='flex-center p-16-medium w-fit flex-1'>
                            {page} / {totalPages}
                        </p>
                        
                        <Button
                            disabled={Number(page) >= totalPages}
                            onClick={() => onPageChange("next")}
                            className="button w-32 bg-purple-gradient bg-cover text-white"
                        >
                                <PaginationNext className="hover:bg-transparent hover:text-white" />
                        </Button>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    )
}

const Card = ({ image }: { image: IImage }) => {
    return (
        <li>
            <Link href={`/transformations/${image._id}`} className="collection-card">
                <CldImage
                    src={image.publicId}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    {...image.config}
                    loading="lazy"
                    className="h-52 w-full rounded-[10px] object-cover"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                />
                <div className="flex-between">
                    <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
                        {image.title}
                    </p>
                    <Image
                        src={`/assets/icons/${transformationTypes[
                                image.transformationType as TransformationTypeKey
                            ].icon
                            }`}
                        alt={image.title}
                        width={24}
                        height={24}
                    />
                </div>
            </Link>
        </li>
    );
};