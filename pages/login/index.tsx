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
  
  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: rem(900),
      backgroundSize: 'cover',
      backgroundImage: 'url("/images/login-background.jpg")',
    },
  
    form: {
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
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

    
  }));
  
  const Login = () => {
    const { classes } = useStyles();
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            FinTrack
          </Title>
  
          <TextInput label="Email adresiniz" placeholder="Email adresinizi giriniz" size="lg" />
          <PasswordInput label="Şifre" placeholder="Şifrenizi giriniz" mt="md" size="lg" />
          <Checkbox label="Beni hatırla" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md">
            Giriş Yap
          </Button>
  
          <Text ta="center" mt="md">
            Hesabınız yok mu? {' '}
            <Anchor<'a'> href="#" weight={700} onClick={(event) => event.preventDefault()}>
              Kayıt Ol
            </Anchor>
          </Text>
        </Paper>
      </div>
    );
  }

  export default Login;