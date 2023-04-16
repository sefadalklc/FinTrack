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
import Link from 'next/link';
import { signIn } from "next-auth/react";
import AuthLayout from '@/layouts/authLayout';
import { useFormik } from "formik";
import * as Yup from "yup";
import { NextPage } from 'next';
import { IconAlertCircle } from '@tabler/icons-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: 'cover',
    backgroundImage: 'url("/images/login-background.jpg")',
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
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

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email alanı gereklidir.").email("Geçerli bir e-posta formatı olmalıdır."),
  password: Yup.string().required("Şifre alanı gereklidir.").min(6, "En az 6 karakterden oluşmalıdır."),
});

const Login: NextPage = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async ({ email, password }) => {
      try {
        await signIn('credentials', {
          email,
          password,
        });
        toast.success('Giriş başarılı!');

      } catch (e) {
        toast.error('Hata!')
      }
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
            value={values.email}
            onChange={handleChange}
            label="Email adresiniz"
            placeholder="Email adresinizi giriniz"
            size="lg"
            id="email"
          />
          {errors.email && touched.email && <Alert mt={10} icon={<IconAlertCircle size="2rem" />} color="red" radius="md" p="xs" variant="outline">{errors.email}</Alert>}

          <PasswordInput
            value={values.password}
            onChange={handleChange}
            label="Şifreniz"
            placeholder="Şifrenizi giriniz"
            mt="md"
            size="lg"
            id="password"
          />
          {errors.password && touched.password && <Alert mt={10} icon={<IconAlertCircle size="2rem" />} color="red" radius="md" p="xs" variant="outline">{errors.password}</Alert>}
          <Button fullWidth mt="xl" size="md" type='submit'>

            Giriş Yap
          </Button>

          <Text ta="center" mt="md">
            Hesabınız yok mu? {' '}
            <Link href="/register" className={classes.link}>
              Kayıt Ol
            </Link>
          </Text>
        </Paper>
      </form>
    </div>
  );
}

Login.Layout = AuthLayout;

export default Login;
