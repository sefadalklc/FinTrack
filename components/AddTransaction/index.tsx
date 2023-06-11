import { Alert, Button, Card, Loader, Paper, Select, Switch, Text, TextInput, Title, createStyles, rem } from "@mantine/core";
import { IconAlertCircle, IconCircle, IconCirclePlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NumberInput } from '@mantine/core';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { DateTimePicker } from '@mantine/dates';


const useStyles = createStyles((theme) => ({
    card: {
        borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
        minHeight: rem('100%'),
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

const AddTransaction = ({ setNewTransaction }: { setNewTransaction: (e: any) => void }) => {

    const { classes } = useStyles();
    const [processLoading, setProcessLoading] = useState({
        status: false,
    });

    const addTransactionSchema = Yup.object().shape({
        entityType: Yup.string().required("Lütfen bir varlık tipi seçiniz"),
        quantity: Yup.number(),
        unitPrice: Yup.number(),
        transactionType: Yup.string().required("Lütfen işlem tipi seçiniz.")
    });


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            entityType: "tl",
            quantity: 1,
            unitPrice: 1,
            stock: null,
            cryptoCurrency: null,
            foreignCurrencyType: null,
            transactionType: null,
            checkedTransactionTime: false,
            transactionTime: null
        },

        validationSchema: addTransactionSchema,

        onSubmit: async ({ cryptoCurrency, entityType, quantity, stock, unitPrice, foreignCurrencyType, transactionType, transactionTime }) => {
            setProcessLoading({ status: true })
            fetch('/api/transaction/addTransaction', {
                method: "POST",
                body: JSON.stringify({
                    entityType,
                    cryptoCurrency,
                    quantity,
                    stock,
                    unitPrice,
                    foreignCurrencyType,
                    transactionType,
                    transactionTime
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(res => {
                    if (res.IsSuccess) {
                        setNewTransaction(true)
                        toast.success(res.Message)
                    } else {
                        toast.error(res.Message)
                    }
                })
                .finally(() => {
                    setProcessLoading({ status: false })
                    formik.resetForm();
                })
        },
    });

    const { errors, touched, values, handleChange, handleSubmit, setFieldValue } = formik;

    return (
        <Card className={classes.card} shadow="sm" padding="lg" radius="md" withBorder>
            <form method='POST' onSubmit={handleSubmit}>
                <Paper radius={0} p={30}>
                    <Title order={2} className={classes.title} ta="left" my="xl" display={"flex"}>
                        <IconCirclePlus size={35} style={{ marginRight: "10px" }} /> <span>İşlem Ekle</span>
                    </Title>

                    <Select
                        id="entityType"
                        onChange={(e) => setFieldValue('entityType', e)}
                        label="Varlık Tipi"
                        size="lg"
                        value={values.entityType}
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
                    {errors.entityType && touched.entityType && <Alert mt={10} icon={<IconAlertCircle size="2rem" />} color="red" radius="md" p="xs" variant="outline">{errors.entityType}</Alert>}

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
                            onChange={(e) => setFieldValue('foreignCurrencyType', e)}
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
                        type="number"
                        size="lg"
                        my="md"
                        min={0}
                        step={1}
                        withAsterisk
                    />

                    <NumberInput
                        id="unitPrice"
                        name="unitPrice"
                        value={values.unitPrice}
                        onChange={(e) => setFieldValue('unitPrice', e)}
                        placeholder="Birim fiyat giriniz"
                        label="Birim Fiyat"
                        type="number"
                        size="lg"
                        my="md"
                        min={0}
                        step={1}
                        withAsterisk
                    />

                    <Select
                        label="İşlem Tipi"
                        size="lg"
                        my="md"
                        placeholder="İşlem tipi seç"
                        onChange={(e) => setFieldValue('transactionType', e)}
                        data={[
                            { value: 'plus', label: 'Ekle' },
                            { value: 'minus', label: 'Çıkar' },
                        ]}
                        withAsterisk
                    />
                    {errors.transactionType && touched.transactionType && <Alert mt={10} icon={<IconAlertCircle size="2rem" />} color="red" radius="md" p="xs" variant="outline">{errors.transactionType}</Alert>}

                    {
                        values.checkedTransactionTime && (
                            <DateTimePicker
                                value={values.transactionTime}
                                onChange={(e) => setFieldValue('transactionTime', e)}
                                label="Tarih ve zaman seçiniz"
                                size="lg"
                                my="md"
                                placeholder="Tarih ve zaman seçiniz"
                                maw={400}
                                mx="auto"
                                withAsterisk
                            />
                        )
                    }

                    <Switch
                        checked={values.checkedTransactionTime}
                        onChange={(e) => setFieldValue('checkedTransactionTime', e.currentTarget.checked)}
                        label="İşlem için gerçekleşme zamanı eklemek istiyorum."
                    />

                    <Button fullWidth mt="xl" size="md" type='submit'>
                        {!processLoading.status ? "Kaydet" : <Loader color="#fff" />}
                    </Button>
                </Paper>
            </form>
        </Card>

    )

}

export default AddTransaction;