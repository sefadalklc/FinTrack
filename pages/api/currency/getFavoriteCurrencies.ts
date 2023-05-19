import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        if (req.method === 'GET') {

            const { currentUser } = await serverAuth(req, res);

            const user = await prisma.user.findFirst({
                where: {
                    id: currentUser.id
                }
            })

            if (currentUser.favoriteCurrencies) {
                try {
                    let userfavoriteCurrencies = await prisma.currency.findMany({
                        where: {
                            id: {
                                in: user?.favoriteCurrencies
                            }
                        }
                    })
                    return res.status(200).json({ IsSuccess: true, Message: "Listeleme başarılı", data: userfavoriteCurrencies })
                }
                catch (e) {
                    return res.status(400).json({ IsSuccess: false, Message: "Hata oluştu!", data: null })
                }
            } else {
                return res.status(200).json({ IsSuccess: true, message: "Listeleme başarılı", data: [] })
            }

        }
    } catch (error) {
        return res.status(400).end()
    }

}