import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import LocationOn from "@mui/icons-material/LocationOn";
import { UnifiedButton } from "@/lib/Form/Button";
import { SectionHeader } from "@/lib/SectionHeader";
import Link from "next/link";

const Help = () => {
  return (
    <>
      <SectionHeader pageTitle="Βοήθεια - Επικοινωνία" />
      <div className="pt-5 max-w-6xl mx-auto px-4 pb-10">
        <div className="flex flex-col gap-10 items-start">
          <div className=" w-full lg:w-1/2 flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#112D63] pb-2">
              Φόρμα Επικοινωνίας
            </h3>

            <div className="flex flex-col gap-4 items-start">
              <p className="text-sm leading-relaxed text-gray-700 ">
                Επικοινωνήστε με το Τμήμα Εξυπηρέτησης Πολιτών υποβάλοντας
                γραπτώς το αίτημα για γενικές διευκρινίσεις σχετικά με
                Προκηρύξεις (συμμετοχή, δικαιολογητικά, τίτλοι σπουδών,
                αποτελέσματα, ενστάσεις και λοιπά).
              </p>
              <div className="mt-auto">
                <UnifiedButton
                  size="medium"
                  variant="primary"
                  icon={<OpenInNewIcon fontSize="small" />}
                  reverse
                  showTooltip={false}
                >
                  <Link
                    href="https://www.asep.gr/webcenter/portal/asep/Επικοινωνία/Φόρμα+Επικοινωνίας#forma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Φόρμα υποβολής αιτήματος
                  </Link>
                </UnifiedButton>
              </div>
            </div>
          </div>

          <div className=" w-full lg:w-1/2 flex flex-col h-full">
            <h3 className="text-xl font-bold text-[#112D63] pb-2">
              Ηλεκτρονικές υπηρεσίες
            </h3>
            <div className="flex flex-col gap-4 items-start flex-grow">
              <p className="text-sm leading-relaxed text-gray-700 ">
                Για τεχνικά θέματα (εγγραφή νέου μέλους, είσοδος μέλους, μητρώο,
                ηλεκτρονική αίτηση, ηλεκτρονική ένσταση) που αφορούν στις
                Ηλεκτρονικές Υπηρεσίες, μπορείτε να στείλετε το ερώτημά σας στην
                εφαρμογή
              </p>
              <div className="flex flex-wrap gap-4">
                <UnifiedButton
                  size="medium"
                  variant="primary"
                  icon={<OpenInNewIcon fontSize="small" />}
                  reverse
                  showTooltip={false}
                >
                  <Link
                    href="https://www.asep.gr/helpdesk/index.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Υποστήριξη Ηλεκτρονικών Υπηρεσιών
                  </Link>
                </UnifiedButton>
              </div>
              <p className="text-sm leading-relaxed text-gray-700 ">
                αφού πρώτα έχετε συμβουλευτεί:{" "}
                <Link
                  href="https://www.asep.gr/webcenter/portal/asep/page1898/page127"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Συχνές Ερωτήσεις
                </Link>{" "}
                και{" "}
                <Link
                  href="https://info.asep.gr/manuals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Εγχειρίδια Χρήσης
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <h3 className="text-xl font-bold text-[#112D63] pb-2">
                Κεντρική Υπηρεσία
              </h3>
              <div className="flex flex-col gap-1">
                <div className="flex items-start">
                  <Email className="text-primary" fontSize="medium" />

                  <Link
                    className="text-primary font-medium pl-2"
                    href="mailto:enimerosi@asep.gr"
                    target="_blank"
                  >
                    enimerosi@asep.gr
                  </Link>
                </div>
                <div className="flex items-start">
                  <Phone className="text-primary" fontSize="medium" />

                  <Link
                    className="text-primary font-medium pl-2"
                    href="tel:213-13-19-100"
                    target="_blank"
                  >
                    213-13-19-100
                  </Link>
                </div>
                <div className="flex items-start">
                  <LocationOn className="text-primary" fontSize="medium" />

                  <Link
                    className="text-primary font-medium pl-2"
                    href="https://www.google.com/maps/place/ASEP+-+Supreme+Council+for+Civil+Personnel+Selection/@37.987494,23.759544,17z/data=!4m6!3m5!1s0x14a1a2ab2f8dd561:0xa5a9ca3cfeab0ac7!8m2!3d37.9874985!4d23.759668!16s%2Fg%2F11ckjcwtdb?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                  >
                    Πουλίου 6, Αθήνα, Τ.Κ. 11523
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#112D63] pb-2">
                Αποκεντρωμένο Τμήμα Θεσσαλονίκης
              </h3>
              <div className="flex flex-col gap-1">
                <div className="flex items-start">
                  <Email className="text-primary" fontSize="medium" />
                  <Link
                    className="text-primary font-medium pl-2"
                    href="mailto:enimerosi@asep.gr"
                    target="_blank"
                  >
                    enimerosi@asep.gr
                  </Link>
                </div>
                <div className="flex items-start">
                  <Phone className="text-primary" fontSize="medium" />
                  <Link
                    className="text-primary font-medium pl-2"
                    href="tel:231-33-21-200"
                    target="_blank"
                  >
                    231-33-21-200
                  </Link>
                </div>
                <div className="flex items-start">
                  <LocationOn className="text-primary" fontSize="medium" />
                  <Link
                    className="text-primary font-medium pl-2"
                    href="https://www.google.com/maps/place/%CE%9B%CE%B5%CF%89%CF%86.+%CE%93%CE%B5%CF%89%CF%81%CE%B3%CE%B9%CE%BA%CE%AE%CF%82+%CE%A3%CF%87%CE%BF%CE%BB%CE%AE%CF%82+65,+%CE%A0%CF%85%CE%BB%CE%B1%CE%AF%CE%B1-%CE%A7%CE%BF%CF%81%CF%84%CE%B9%CE%AC%CF%82+555+35/@40.5566952,22.9791726,17z/data=!3m1!4b1!4m6!3m5!1s0x14a83f73720d5ff7:0x90ccbacd0ad6bf26!8m2!3d40.5566952!4d22.9791726!16s%2Fg%2F11c22zp2st?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                  >
                    Λεωφ. Γεωργικής Σχολής 65, Θέρμη, Τ.Κ. 57001
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
