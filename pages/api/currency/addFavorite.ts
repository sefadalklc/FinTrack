import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        if (req.method === 'POST') {

            const { currentUser } = await serverAuth(req, res);

            // currency id'si
            const { id } = req.body;

            // currency daha önce favoriteCurrencies
            const findCurrency = currentUser?.favoriteCurrencies.find(e => e == id);

            if (findCurrency) {
                return res.status(400).json({ "IsSuccess": false, "Message": "Zaten ekli!" })
            } else {
                let list = [...currentUser.favoriteCurrencies, id]
                const result = await prisma.user.update({
                    where: {
                        id: currentUser.id
                    },
                    data: {
                        favoriteCurrencies: list
                    }
                })
                return res.status(200).json({ "IsSuccess": true, "Message": "Ekleme başarılı!" })
            }
        }
    } catch (error) {
        return res.status(400).end()
    }

}