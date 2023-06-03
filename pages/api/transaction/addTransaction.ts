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
            console.log(req.body)
            // currency id'si
            const { stock, quantity, unitPrice, cryptoCurrency, entityType, foreignCurrencyType, transactionType, transactionTime } = req.body;

            try {
                await prisma.transaction.create({
                    data: {
                        stock,
                        quantity,
                        unitPrice,
                        cryptoCurrency,
                        entityType,
                        foreignCurrencyType,
                        transactionType,
                        transactionTime,
                        userId: currentUser.id
                    }
                })
                return res.status(200).json({ "IsSuccess": true, "Message": "Ekleme başarılı!" })
            } catch (e) {
                console.log(e)
                return res.status(400).json({ "IsSuccess": false, "Message": "Hata oluştu!" })
            }
        }
    } catch (error) {
        return res.status(400).end()
    }
}