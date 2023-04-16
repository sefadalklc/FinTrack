import useCurrentUser from "@/hooks/useCurrentUser";
import { Alert, MantineTheme, createStyles } from "@mantine/core";
import { IconAlarm, IconMoodSmile } from "@tabler/icons-react";


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
        <Alert icon={<IconMoodSmile size="2rem" />} withCloseButton color="blue" radius="md">
            <span className={classes.heroAlertText}>Hoşgeldiniz, {currentUser?.name}!</span>
        </Alert>
    )

}

export default HomepageHeroAlert;