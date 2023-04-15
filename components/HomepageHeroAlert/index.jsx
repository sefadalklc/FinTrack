import { Alert, createStyles } from "@mantine/core";
import { IconAlarm, IconMoodSmile } from "@tabler/icons-react";


const useStyles = createStyles((theme) => ({
    heroAlertText: {
        fontSize: '1rem',
        fontWeight: '500',
        color: theme.colors.blue[9]
    }
}))

const HomepageHeroAlert = () => {
    const { classes, cx } = useStyles();
    return (
        <Alert icon={<IconMoodSmile size="2rem" />} withCloseButton color="blue" radius="md">
            <span className={classes.heroAlertText}>Hoşgeldiniz, Sefa Dalkılıç!</span>
        </Alert>
    )

}

export default HomepageHeroAlert;