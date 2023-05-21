import { Alert, Button, Card, Paper, PasswordInput, Select, Text, TextInput, Title, createStyles, rem } from "@mantine/core";
import { IconAlertCircle, IconCircle, IconCirclePlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { NumberInput } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    card: {
        borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
        minHeight: rem(900),
        maxWidth: rem(600),
        paddingTop: rem(80),
        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors.blue[7],
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    link: {
        textDecoration: 'none',
        color: theme.colors.blue[8],
        fontWeight: "bold"
    }

}));

const AddTransaction = () => {

    const { classes } = useStyles();

    const addTransactionSchema = Yup.object().shape({
        entityType: Yup.string().nullable()
    });


    const formik = useFormik({
        initialValues: {
            entityType: null,
            quantity: 1,
            unitPrice: 1,
            stock: null,
            cryptoCurrency: null
        },

        validationSchema: addTransactionSchema,

        onSubmit: async ({ entityType }) => {
            console.log(entityType)
        },
    });

    const { errors, touched, values, handleChange, handleSubmit, setFieldValue } = formik;

    return (
        <Card className={classes.card} shadow="sm" padding="lg" radius="md" withBorder>
            <form method='POST' onSubmit={handleSubmit}>
                <Paper radius={0} p={30}>
                    <Title order={2} className={classes.title} ta="left" my="xl">
                        <IconCirclePlus size={35} /> İşlem Ekle
                    </Title>

                    <Select
                        id="entityType"
                        onChange={(e) => setFieldValue('entityType', e)}
                        label="Varlık Tipi"
                        size="lg"
                        my="md"
                        placeholder="Varlık tipi seç"
                        data={[
                            { value: 'tl', label: 'Türk Lirası' },
                            { value: 'foreignCurrency', label: 'Döviz' },
                            { value: 'gold', label: 'Altın' },
                            { value: 'silver', label: 'Gümüş' },
                            { value: 'stock', label: 'Hisse Senedi' },
                            { value: 'cryptoCurrency', label: 'Kripto Para' },
                        ]}
                        withAsterisk
                    />


                    {(values.entityType && values.entityType === "stock")
                        &&
                        <TextInput
                            // value={values.email}
                            onChange={handleChange}
                            label="Hisse Senedi"
                            placeholder="Hisse senedini giriniz"
                            size="lg"
                            id="stock"
                            withAsterisk
                        />
                    }

                    {(values.entityType && values.entityType === "cryptoCurrency")
                        &&

                        <TextInput
                            // value={values.email}
                            onChange={handleChange}
                            label="Kripto Para"
                            placeholder="Kripto parayı giriniz"
                            size="lg"
                            id="cryptoCurrency"
                            withAsterisk
                        />


                    }


                    {(values.entityType && values.entityType === "foreignCurrency")
                        &&
                        <Select
                            label="Döviz Tipi"
                            size="lg"
                            my="md"
                            placeholder="Döviz tipi seç"
                            data={[
                                { value: 'USD', label: 'ABD Doları' },
                                { value: 'EUR', label: 'Euro' },
                                { value: 'GBP', label: 'İngiliz Sterlini' },
                                { value: 'CHF', label: 'İsviçre Frangı' },
                                { value: 'JPY', label: 'Japon Yeni' },
                                { value: 'SAR', label: 'Suudi Arabistan Riyali' },
                                { value: 'DKK', label: 'Danimarka Kronu' },
                                { value: 'AUD', label: 'Avustralya Doları' },
                                { value: 'CAD', label: 'Kanada Doları' },
                                { value: 'SEK', label: 'İsveç Kronu' },
                                { value: 'RUB', label: 'Ruble' },
                            ]}
                        />
                    }


                    <NumberInput
                        id="quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={(e) => setFieldValue('quantity', e)}
                        placeholder="Miktar giriniz"
                        label="Miktar"
                        size="lg"
                        my="md"
                        withAsterisk
                    />

                    <NumberInput
                        id="unitPrice"
                        name="unitPrice"
                        value={values.unitPrice}
                        onChange={(e) => setFieldValue('unitPrice', e)}
                        placeholder="Birim fiyat giriniz"
                        label="Birim Fiyat"
                        size="lg"
                        my="md"
                        withAsterisk
                    />

                    <Select
                        label="İşlem Tipi"
                        size="lg"
                        my="md"
                        placeholder="İşlem tipi seç"
                        data={[
                            { value: 'plus', label: 'Ekle' },
                            { value: 'minus', label: 'Çıkar' },
                        ]}
                        withAsterisk
                    />
                    <Button fullWidth mt="xl" size="md" type='submit'>
                        Kaydet
                    </Button>
                </Paper>
            </form>
        </Card>

    )

}

export default AddTransaction;