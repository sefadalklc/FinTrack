import { Grid } from '@mantine/core';
import useWindowSize from '@/hooks/useWindowSize';
import Sidebar from '@/components/Sidebar';

export default function BaseLayout({ children }: any) {

    const { width, height } = useWindowSize();

    return (
        <Grid m={0}>
            {width > 850 && <Grid.Col p={0} m={0} span="content"><Sidebar /></Grid.Col>}
            <Grid.Col p={0} m={0} span="auto" display={"flex"} >
                {children}
            </Grid.Col>
        </Grid>
    );
}