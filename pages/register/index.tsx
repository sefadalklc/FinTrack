import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    rem,
} from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

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

const Login = () => {
    const { classes } = useStyles();
    const router = useRouter();


    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const register = useCallback(() => {
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
    }, [email, password, username, name])


    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    FinTrack
                </Title>

                <TextInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="İsminiz"
                    placeholder="İsminizi giriniz"
                    size="lg"
                />
                <TextInput
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Kullanıcı adınız"
                    placeholder="Kullanıcı adınızı giriniz"
                    size="lg"
                    mt="md"
                />
                <TextInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email adresiniz"
                    placeholder="Email adresinizi giriniz"
                    size="lg"
                    mt="md"
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Şifre"
                    placeholder="Şifrenizi giriniz"
                    mt="md"
                    size="lg"
                />
                <Button fullWidth mt="xl" size="md" onClick={register}>
                    Kayıt Ol
                </Button>

                <Text ta="center" mt="md">
                    Zaten bir hesabınız mı var? {' '}
                    <Link href="/login" className={classes.link}>
                        Giriş Yap
                    </Link>
                </Text>
            </Paper>
        </div>
    );
}

export default Login;