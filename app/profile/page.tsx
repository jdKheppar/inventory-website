import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FaUser } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';



const Profile = () => {

  const user = {
    name: "Danish Heilium",
    email: "danish@example.com",
    role: "Ui/Ux Designer",
  };

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 py-6 text-center lg:py-8 xl:py-11.5">
          <div className="mb-4">
            <div className="text-6xl text-primary mx-auto flex items-center justify-center"> {/* Use flexbox to center the icon */}
              <FaUser />
            </div>
            <h3 className="mt-2 text-3xl font-semibold text-black dark:text-white">
              {user.name}
            </h3>
          </div>
          <div className="text-xl mb-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <HiOutlineMail />
              {user.email}
            </div>
          </div>
          <div className="text-lg text-primary">
            {user.role}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
