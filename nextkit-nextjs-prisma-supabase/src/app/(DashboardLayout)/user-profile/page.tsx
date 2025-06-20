"use client"
import CardBox from "@/app/components/shared/CardBox"
import { Profile } from "@/app/components/user-profile/Profile"
import { Icon } from "@iconify/react/dist/iconify.js"

const page = () => {

    return (
        <>
            <div className="h-screen w-full flex justify-center">
                <div className="md:min-w-[400px] lg:w-fit w-full">
                    <CardBox >
                        <div className="flex flex-col items-center mb-4"  >
                            <span className=" size-20 rounded-full border border-border flex items-center justify-center bg-gray-50">
                                <Icon icon="solar:user-linear" width="44" height="44" className="text-muted" />
                            </span>
                        </div>
                        <Profile />
                    </CardBox>
                </div>
            </div>
        </>
    )
}

export default page