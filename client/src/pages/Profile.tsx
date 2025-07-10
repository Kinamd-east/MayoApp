import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Profile = () => {
  const { id } = useParams();
  const { ready, authenticated } = usePrivy();
  const [user, setUser] = useState({
    twitterName: "",
    twitterUsername: "",
    twitterPfp: "",
  });
  console.log(id);
  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(`http://localhost:5000/auth/user/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
    };
    getUserData();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     const getTwitterId = async () => {
  //       const username = user?.twitterUsername;
  //       const res = await fetch(
  //         `http://localhost:5000/auth/twitterid/${username}`,
  //         {
  //           method: "GET",
  //         },
  //       );
  //       const data = await res.json();
  //       console.log(data);
  //     };
  //     getTwitterId();
  //   }
  // }, [user]);

  // const checkReward = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/rewards/${user?.twitterId}`,
  //     );
  //     const data = await res.json();
  //     setReward(data.reward);
  //   } catch (err) {
  //     console.error("Error fetching reward", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div>
      {ready ? (
        authenticated ? (
          user ? (
            // <div class="flex flex-col p-8">
            //   <div class="flex flex-row text-left gap-2 items-center justify-between">
            //     <div class="flex flex-row text-left gap-2 items-center">
            //       <Avatar>
            //         <AvatarImage
            //           src={user?.twitterPfp}
            //           alt={user?.twitterName}
            //         />
            //         <AvatarFallback>{user?.twitterUsername}</AvatarFallback>
            //       </Avatar>
            //       <div class="flex flex-col">
            //         <h1 class="font-bold text-black">{user?.twitterName}</h1>
            //         <p class="text-gray-500 text-[14px] font-semibold">
            //           @{user?.twitterUsername}
            //         </p>
            //       </div>
            //     </div>
            //     <div class="bg-gray-800 text-white rounded-xl p-4 shadow-md">
            //       <div class="text-center">
            //         <h1 class="font-bold text-xl md:text-2xl lg:text-3xl mb-2">
            //           Total $nese Earned
            //         </h1>
            //         <p class="font-light text-lg">0</p>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <div className="dashboard-container p-8">
              <header className="flex justify-between items-center mb-4">
                <div className="flex flex-row text-left gap-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={user?.twitterPfp}
                      alt={user?.twitterName}
                    />
                    <AvatarFallback>{user?.twitterUsername}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-black">{user?.twitterName}</h1>
                    <p className="text-gray-500 text-[14px] font-semibold">
                      @{user?.twitterUsername}
                    </p>
                  </div>
                </div>
                <Button className="bg-black cursor-pointer hover:bg-gray-500 transition text-white px-4 py-2 rounded">
                  Connect Wallet
                </Button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="font-bold font-mono text-lg">
                    Total earned $NESE
                  </h2>
                  <p className="font-mono font-semibold text-center">100</p>
                </div>
                {/*<div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="font-bold text-lg font-mono">
                    Project Watchlist
                  </h2>
                  <ul className="flex flex-col gap-1 items-center">
                    <li className="font-semibold font-mono"> * Openledger</li>
                    <li className="font-semibold font-mono"> * Bybit</li>
                    <li className="font-semibold font-mono"> * Bitget</li>
                  </ul>
                </div>*/}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="font-bold text-lg font-mono">
                    Mayo Followers
                  </h2>
                  <p className="font-mono font-bold text-center">150</p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )
        ) : (
          <h1>You have to sign in to access this data</h1>
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;
