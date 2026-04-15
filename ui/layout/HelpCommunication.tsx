import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import CrossAppLink from "@/lib/CrossAppLink";

const HelpCommunication = () => {
  return (
    <Tooltip title="Βοήθεια & Επικοινωνία">
      <div className="flex items-center hover:none bg-transparent cursor-pointer my-auto p-0">
        <CrossAppLink
          href={`${process.env.NEXT_PUBLIC_PROXY_BASE_URL}/help`}
          updateMenuHref={false}
        >
          <InfoIcon className="text-gray-700" fontSize="large" />
        </CrossAppLink>
      </div>
    </Tooltip>
  );
};

export default HelpCommunication;
