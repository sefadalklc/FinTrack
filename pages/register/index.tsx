import AuthLayout from '@/layouts/authLayout';
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    rem,
    Alert,
} from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconAlertCircle } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: rem(900),
        backgroundSize: 'cover',
        backgroundImage: 'url("/images/login-background.jpg")',
    },

    form: {
        borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        minHeight: rem(900),
        maxWidth: rem(450),
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

const registerSchema = Yup.object().shape({
    email: Yup.string().required("Email alanı gereklidir.").email("Geçerli bir e-posta formatı olmalıdır."),
    password: Yup.string().required("Şifre alanı gereklidir.").min(6, "En az 6 karakterden oluşmalıdır."),
    username: Yup.string().required("Kullanıcı adı alanı gereklidir.").min(3, "En az 3 karakterden oluşmalıdır."),
    name: Yup.string().required("İsim alanı gereklidir.")
});

const Register = () => {
    const { classes } = useStyles();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: "",
            name: ""
        },

        validationSchema: registerSchema,

        onSubmit: async ({ email, password, username, name }) => {
            axios.post('/api/register', {
                email,
                password,
                username,
                name
            })
                .then(response => {
                    if (response.status = 200) {
                        toast.success('Thank you for registering! Your account has been successfully created.');
                        router.push('/login')
                    }
                    else
                        toast.error('Registration failed. Please make sure all fields are filled out correctly and try again.')
                })
                .catch(error => {
                    toast.error('Oops! It looks like something went wrong. Please try again later.')
                })
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className={classes.wrapper}>
            <form method='POST' onSubmit={handleSubmit}>
                <Paper className={classes.form} radius={0} p={30}>
                    <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                        FinTrack
                    </Title>

                    <TextInput
                        value={values.name}
                        onChange={handleChange}
                        label="İsminiz"
                        placeholder="İsminizi giriniz"
                        size="lg"
                        id='name'
                    />
                    {errors.name && touched.name && <Alert mt={10} icon={<IconAlertCircle size="2rem" />} color="red" radius="md" p="xs" variant="outline">{errors.name}</Alert>}

                    <TextInput
                        value={values.username}
                        onChange={handleChange}
                        label="Kullanıcı adınız"
                        placeholder="Kullanıcı adınızı giriniz"
                        size="lg"
                        mt="md"
                        id='username'
                    />
                    {errors.username && touched.username && <Alert mt={10} icon={<IconAlertCircle size="2rem" />} color="red" radius="md" p="xs" variant="outline">{errors.username}</Alert>}

                    <TextInput
                        value={values.email}
                        onChange={handleChange}
                        label="Email adresiniz"
                        placeholder="Email adresinizi giriniz"
                        size="lg"
                        mt="md"
                        id='email'
                    />
                    {errors.email && touched.email && <Alert mt={10} icon={<IconAlertCircle size="2rem" />} color="red" radius="md" p="xs" variant="outline">{errors.email}</Alert>}

                    <PasswordInput
                        value={values.password}
                        onChange={handleChange}
                        label="Şifre"
                        placeholder="Şifrenizi giriniz"
                        mt="md"
                        size="lg"
                        id='password'
                    />
                    {errors.password && touched.password && <Alert mt={10} icon={<IconAlertCircle size="2rem" />} color="red" radius="md" p="xs" variant="outline">{errors.password}</Alert>}

                    <Button fullWidth mt="xl" size="md" type='submit'>
                        Kayıt Ol
                    </Button>

                    <Text ta="center" mt="md">
                        Zaten bir hesabınız mı var? {' '}
                        <Link href="/login" className={classes.link}>
                            Giriş Yap
                        </Link>
                    </Text>
                </Paper>
            </form>
        </div>
    );
}

export default Register;


Register.Layout = AuthLayout;