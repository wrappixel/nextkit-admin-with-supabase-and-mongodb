"use client"
import Link from "next/link";
import CardBox from "../shared/CardBox";
import Image from "next/image";
import { Button, Rating, Tooltip } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface productType {
    photo:any,
    title:string,
    price:string,
    quantity:string
}

export const Product = ({photo,title,price,quantity}:productType) => {
    return(
        <CardBox className="p-0 overflow-hidden group card-hover">
        <div className="relative">
          <Link href={`/utilities/table`}>
            <div className="overflow-hidden h-[265px] w-full">
              <Image
                src={photo}
                alt="materialm"
                height={265}
                width={500}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <div className="p-6 pt-4">
            <h6 className="text-base line-clamp-1 group-hover:text-primary">
              {title}
            </h6>
            <div className="flex justify-between items-center mt-1">
              <div className="text-sm text-muted flex items-center gap-2 font-medium">Sales : <span className="text-[15px] flex gap-2 text-dark items-center">
                {quantity}
              </span></div>
              {Number(quantity) > 5 ? (
                <Rating size={"sm"} className="text-warning" >
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                </Rating>
              ) : Number(quantity)/2 ? (
                <Rating size={"sm"}>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              ) : (
                <Rating size={"sm"}>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                  <Rating.Star filled={false} />
                </Rating>
              )}
            </div>
          </div>
        </div>
      </CardBox>
    )
}