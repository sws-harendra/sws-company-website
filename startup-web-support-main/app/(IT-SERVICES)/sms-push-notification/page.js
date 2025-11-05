import NotificationServices from "./components/NotificationServices";
import PageDivider from "@/components/PageDivider";
import LiveNotificationsCta from "./components/LiveNotificationsCta";
import Faq from "./components/Faq";

const page = () => {
    return (
        <div>
            <NotificationServices />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <LiveNotificationsCta />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <Faq />
        </div>
    )
}

export default page
