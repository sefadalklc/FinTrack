import React, { useEffect, useRef } from 'react';
import style from "@/components/TradingViewRealTimeWidget/style.module.css"
import { Title } from '@mantine/core';

let tvScriptLoadingPromise: Promise<Event>;

const TradingViewRealTimeWidget = (): JSX.Element => {
    const onLoadScriptRef = useRef<(() => void) | undefined>();

    useEffect(() => {
        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise<Event>((resolve) => {
                const script = document.createElement('script');
                script.id = 'tradingview-widget-loading-script';
                script.src = 'https://s3.tradingview.com/tv.js';
                script.type = 'text/javascript';
                script.onload = resolve;

                document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(() =>
            onLoadScriptRef.current && onLoadScriptRef.current()
        );

        return () => {
            onLoadScriptRef.current = undefined;
        };
    }, []);

    const widgetContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        createWidget();
    }, []);

    function createWidget(): void {
        if (
            document.getElementById('tradingview_87902') &&
            'TradingView' in window
        ) {
            new window.TradingView.widget({
                autosize: true,
                symbol: 'BINANCE:BTCUSD',
                interval: 'D',
                timezone: 'Etc/UTC',
                theme: 'light', // dark
                style: '1',
                locale: 'tr',
                toolbar_bg: '#f1f3f6',
                enable_publishing: true,
                withdateranges: true,
                hide_side_toolbar: false,
                allow_symbol_change: true,
                details: true,
                hotlist: true,
                calendar: true,
                container_id: 'tradingview_87902',
            });
        }
    }

    return (
        <>
            <Title c="blue" mb={10} order={2}>Gerçek Zamanlı Grafik</Title>
            <div
                className={`tradingview-widget-container ${style.chartContainer}`}
                ref={widgetContainerRef}
            >
                <div
                    id="tradingview_87902"
                    className={`tradingview-widget-container ${style.chartContainer}`}
                />
                <div className="tradingview-widget-copyright">
                    FinTrack için TradingView tarafından sunulan gerçek zamanlı grafik.
                </div>
            </div>
        </>
    );
};

export default TradingViewRealTimeWidget;
