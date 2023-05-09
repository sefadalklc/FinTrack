import { useEffect } from "react";

const TradingViewWidget = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            interval: "1m",
            width: 425,
            isTransparent: false,
            height: 450,
            symbol: "NASDAQ:AAPL",
            showIntervalTabs: true,
            locale: "en",
            colorTheme: "light",
        });
        document.getElementById("tradingview-widget-container").appendChild(script);

        return () => {
            document.getElementById("tradingview-widget-container").innerHTML = "";
        };
    }, []);

    return (
        <div id="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/symbols/NASDAQ-AAPL/technicals/"
                    rel="noopener"
                    target="_blank"
                >
                    <span className="blue-text">AAPL stock analysis</span>
                </a>{" "}
                by TradingView
            </div>
        </div>
    );
};

export default TradingViewWidget;
