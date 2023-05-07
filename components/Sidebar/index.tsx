import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import {
    IconSettings,
    IconLogout,
    IconHome,
} from '@tabler/icons-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
        height: '100vh'
    },


    projectName: {
        color: theme.colors.gray[2]
    },

    version: {
        backgroundColor: theme.colors.blue[5],
        color: theme.white,
        fontWeight: 700,
    },

    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${theme.colors.blue[5]}
    )}`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${theme.colors.blue[5]}`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.white,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colors.blue[5]
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.white,
        opacity: 0.75,
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.colors.blue[5],
            [`& .${getStylesRef('icon')}`]: {
                opacity: 0.9,
            },
        },
    },
}));

const data = [
    { link: '/', label: 'Anasayfa', icon: IconHome },
    { link: '/settings', label: 'Ayarlar', icon: IconSettings },
];

const Sidebar = () => {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState<string>('Billing');

    const links = data.map((item) => (
        <Link
            key={item.label}
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href={item.link}
            onClick={() => { setActive(item.label); }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <h1 className={classes.projectName}>FinTrack</h1>
                    <Code className={classes.version}>v1.0.0</Code>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <div className={classes.link} onClick={() => {
                    signOut()
                }}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Çıkış Yap</span>
                </div>
            </Navbar.Section>
        </Navbar>
    );
}

export default Sidebar;