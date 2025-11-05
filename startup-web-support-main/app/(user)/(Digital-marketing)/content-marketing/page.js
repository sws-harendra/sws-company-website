import CompactCtaBanner from "./components/CompactCtaBanner"
import ContentMarketingFaq from "./components/ContentMarketingFaq"
import ContentMarketingHero from "./components/ContentMarketingHero"
import PartnershipBenefits from "./components/PartnershipBenefits"

const page = () => {
  return (
    <div>
        <ContentMarketingHero/>
        <PartnershipBenefits/>
        <CompactCtaBanner/>
        <ContentMarketingFaq/>
    </div>
  )
}

export default page
