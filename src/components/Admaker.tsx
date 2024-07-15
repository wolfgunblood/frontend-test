import React from 'react'

// type Props = {}
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"


const Admaker = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
        
  )
}

export default Admaker