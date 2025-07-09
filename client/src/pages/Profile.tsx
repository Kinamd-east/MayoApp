import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { id } = useParams();
  const [reward, setReward] = useState(0);
  const [loading, setLoading] = useState(false);
  const { ready, authenticated } = usePrivy();
  const [user, setUser] = useState("");
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
            <div className="flex flex-col p-8">
              <div className="flex flex-row text-left gap-2 items-center justify-between">
                <div className="flex flex-row text-left gap-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={user?.twitterPfp}
                      alt={user?.twitterName}
                    />
                    <AvatarFallback>{user?.twitterUsername}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="fomnt-bold text-black">
                      {user?.twitterName}
                    </h1>
                    <p className="text-gray-500 text-[14px] font-semibold">
                      @{user?.twitterUsername}
                    </p>
                  </div>
                </div>
                <d