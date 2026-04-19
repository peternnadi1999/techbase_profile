import { usePost, useGet, usePatch } from "@/lib/hooks";
import { PROFILE, UPLOAD } from "../api-constant";
import { useHandleSuccess , useHandleError} from "../hook/useToastHandlers";
import { ProfileFormInputs } from "@/type";


// User service using hooks
export const useUserService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const useUpdateProfile = () => {
		return usePatch<ProfileFormInputs, any>(
			PROFILE.UPDATE,
            {
                onSuccess: (res) => {
                    handleSuccess(res.message || 'Profile updated successfully');
                },
                onError: (err) => {
                    handleError(err.message || 'Failed to update profile');
                },
                invalidateQueries: [["currentUser"]],
            }
        );
    };

    
	const useGetProfile = (enabled: boolean = true) => {
		return useGet<ProfileFormInputs>(["currentUser"], PROFILE.GET, {
			enabled: enabled,
			staleTime: 5 * 60 * 1000, // 5 minutes
		});
	};

    const useUploadImage = () => {
        return usePost<any, FormData>(
            UPLOAD.UPLOAD_IMAGE,
            {
                onSuccess: (res) => {
                    handleSuccess(res.message || 'Image uploaded successfully');
                },
                onError: (err) => {
                    handleError(err.message || 'Failed to upload image');
                },
            }
        );
    }
	

	return {
		useUpdateProfile,
        useGetProfile,
        useUploadImage
	};
};
