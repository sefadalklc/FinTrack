import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        if (req.method === 'POST') {
            // transaction id'si
            const { id } = req.body;

            // transaction'u bul
            const findTransactions = await prisma.transaction.findUnique({
                where: {
                    id: id
                }
            })

            if (findTransactions) {
                try {
                    await prisma.transaction.delete({
                        where: {
                            id: id
                        }
                    })
                    return res.status(200).json({ "IsSuccess": true, "Message": "Silme başarılı!" })
                } catch (e) {
                    return res.status(400).json({ "IsSuccess": false, "Message": "Hata oluştu!" })
                }

            } else {
                return res.status(400).json({ "IsSuccess": false, "Message": "İşlem geçmişinizde zaten yok!" })
            }
        }
    } catch (error) {
        return res.status(400).end()
    }

}