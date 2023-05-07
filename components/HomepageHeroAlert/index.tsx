import useCurrentUser from "@/hooks/useCurrentUser";
import { Alert, createStyles } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";


const useStyles = createStyles((theme): any => ({
    heroAlertText: {
        fontSize: '1rem',
        fontWeight: '500',
        color: theme.colors.blue[9]
    }
}))

const HomepageHeroAlert = () => {
    const { classes } = useStyles();

    const { data: currentUser } = useCurrentUser();

    return (
        <Alert icon={<IconUser size="2rem" />} withCloseButton color="blue" radius="md" mt={10} mb={20}>
            <span className={classes.heroAlertText}>Hoşgeldiniz, {currentUser?.name}!</span>
        </Alert>
    )

}

export default HomepageHeroAlert;