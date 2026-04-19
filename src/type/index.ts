export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

export interface ProfileFormInputs {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	accountType: string;
	profileImage: string;
    createdAt: string;
	updatedAt: string;
}
