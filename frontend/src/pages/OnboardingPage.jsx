import React, { useState } from "react";
import useAuthHook from "../hooks/useAuthHook.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";
import { CameraIcon, ShuffleIcon, MapPinIcon, ShipWheelIcon, LoaderIcon } from "lucide-react";
import { GEEKY_INTEREST_TAGS, LANGUAGES } from "../constants/index.js";

const OnboardingPage = () => {
  //authUser
  const { authUser} = useAuthHook();

  const [detailsData, setDetailsData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    interestTag: authUser?.interestTag || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(detailsData);
  };

  //generate random avatar
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random()*100+1)
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

    //update the state
    setDetailsData({...detailsData,profilePic:randomAvatar})
    toast.success("Avatar updated successfully!!")
  };

  return (
    <div className="min-h-screen bg-base-100 flex justify-center items-center p-4">
      <div className="card bg-base-100 w-full max-w-3xl shadow-xl">
        {/* card body */}
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete your profile
          </h1>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* profile pic container */}
            <div className="flex flex-col justify-center items-center space-y-4">
              {/* image */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {detailsData.profilePic ? (
                  <img
                    src={detailsData.profilePic}
                    alt="Profile pic"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-start h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/* generate random avatar button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* fullname */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={detailsData.fullName}
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                onChange={(e) =>
                  setDetailsData({ ...detailsData, fullName: e.target.value })
                }
              />
            </div>

            {/* bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={detailsData.bio}
                className="textarea textarea-bordered h-24"
                placeholder="Tell us a bit about yourself"
                onChange={(e) =>
                  setDetailsData({ ...detailsData, bio: e.target.value })
                }
              />
            </div>

            {/* languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* native language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={detailsData.nativeLanguage}
                  className="select select-bordered w-full"
                  onChange={(e) =>
                    setDetailsData({
                      ...detailsData,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* interestTag */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Geeky Interest Tags</span>
                </label>
                <select
                  name="interestTag"
                  value={detailsData.interestTag}
                  className="select select-bordered w-full"
                  onChange={(e) =>
                    setDetailsData({
                      ...detailsData,
                      interestTag: e.target.value,
                    })
                  }
                >
                  <option value="">Select your tag</option>
                  {GEEKY_INTEREST_TAGS.map((lang) => (
                    <option key={`interest-${lang}`} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={detailsData.location}
                  onChange={(e) =>
                    setDetailsData({ ...detailsData, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* submit button */}
            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                <ShipWheelIcon className="size-5 mr-2"/>
                Complete onboarding
                </>
              ) : (
                <>
                <LoaderIcon className="size-5 mr-2 animate-spin"/>
                Onboarding....
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
