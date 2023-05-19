import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        if (req.method === 'POST') {

            const { currentUser } = await serverAuth(req, res);

            // currency id'si
            const { id } = req.body;

            // currency daha önce favoriteCurrencies
            const findCurrency = currentUser?.favoriteCurrencies.find(e => e === id);

            if (findCurrency) {
                let list = currentUser.favoriteCurrencies.filter(c => c !== id);

                try {
                    await prisma.user.update({
                        where: {
                            id: currentUser.id
                        },
                        data: {
                            favoriteCurrencies: list
                        }
                    })
                    return res.status(200).json({ "IsSuccess": true, "Message": "Silme başarılı!" })
                } catch (e) {
                    return res.status(400).json({ "IsSuccess": false, "Message": "Hata oluştu!" })
                }

            } else {
                return res.status(400).json({ "IsSuccess": false, "Message": "Favorilerinizde zaten yok!" })
            }
        }
    } catch (error) {
        return res.status(400).end()
    }

}