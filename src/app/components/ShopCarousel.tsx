'use client'
import { useState } from "react"
import { mediaImages } from "../data"
import { motion, AnimatePresence } from "framer-motion"
import { NavigateBeforeRounded, NavigateNextRounded } from "@mui/icons-material"

function ShopCarousel() {
    const [ position, setPosition ] = useState<number>(0)
    const [ direction, setDirection ] = useState<string>('')
    
    const nextImage = () => {
        setDirection('right')
        if(position === mediaImages.length - 1){
            setPosition(0)
        } else {
            setPosition(position + 1)
        }
    }

    const prevImage = () => {
        setDirection('left')
        if(position === 0){
            setPosition(mediaImages.length - 1)
        } else {
            setPosition(position - 1)
        }
    }

    //variants object for motion.img
    const variants:{} = {
        initial:{  
            opacity: 0, 
            x: direction === 'right' ? 100 : -100 
        },
        animate: { 
            opacity: 1, 
            x: 0,
            transition: {
                x: { 
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                },
                opacity: {
                    duration: 0.2
                }
            }
        },
        exit:{ 
            opacity: 0, 
            x: direction === 'left' ? -100 : 100 
        }
    }

    return (
        <div
            className="relative h-[400px] md:h-[800px] w-full overflow-hidden object-cover"
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.img 
                    key={mediaImages[position]}
                    src={mediaImages[position]} 
                    alt="images" 
                    className="rounded-lg h-full w-full object-cover" 
                    variants={variants}  
                    initial="initial"
                    animate='animate'
                    exit='exit'
                    custom={direction}
                />
            </AnimatePresence>

            {/* button to go left */}
            <div
                onClick={prevImage}
                className="absolute top-[45%] left-3 cursor-pointer p-3 flex items-center rounded-full bg-white transition duration-300 hover:bg-orange-500"
            >
                <NavigateBeforeRounded />
            </div> 

            {/* button to go right */} 
            <div
                onClick={nextImage}
                className="absolute top-[45%] right-3 cursor-pointer p-3 flex items-center rounded-full bg-white transition duration-300 hover:bg-orange-500"
            >
                <NavigateNextRounded />
            </div>  
        </div>
    )
}

export default ShopCarousel