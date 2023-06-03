import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    if (req.method === 'GET') {

        const { currentUser } = await serverAuth(req, res);

        try {
            let userTransactions = await prisma.transaction.findMany({
                where: {
                    userId: {
                        in: currentUser.id
                    }
                }
            })
            return res.status(200).json({ IsSuccess: true, Message: "Listeleme başarılı", data: userTransactions })
        }
        catch (e) {
            return res.status(400).json({ IsSuccess: false, Message: "Hata oluştu!", data: null })
        }
    }
}