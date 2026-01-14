import NotificationServices from "./components/NotificationServices";
import PageDivider from "@/components/PageDivider";
import LiveNotificationsCta from "./components/LiveNotificationsCta";
import Faq from "./components/Faq";
import Seo from "@/components/Seo";

const page = () => {
    return (
        <div>
             <Seo
                    title="Effective SMS & Push Notification Services for Your Business"
                    description="Boost customer engagement with SMS and push notification services that deliver instant alerts, promotions, and updates to grow your business faster."
                    keywords="SMS and Push Notification service providers in Patna, digital marketing and communication company in Bihar, SMS service providers in Patna, SMS providers in Patna,Push Notification service providers in Patna"
                        />
            <NotificationServices />
            <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
            <LiveNotificationsCta />
            <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
            <Faq />
        </div>
    )
}

export default page
