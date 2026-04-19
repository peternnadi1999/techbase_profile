import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/profile - Returns current user's profile
export async function GET() {
	try {
		// In a single-user context, get the first user
		let user = await prisma.user.findFirst();

		// If no user exists, create a default one
		if (!user) {
			user = await prisma.user.create({
				data: {
					name: "Oluwole Adigun",
					email: "techbaseusertest@gmail.com",
					phoneNumber: "8054975150",
					address:
						"95, Oba Iseri Hamar Street, Off Afon Adewale Street, VI Island, Lagos",
					accountType: "Individual",
					profileImage: null,
				},
			});
		}

		return NextResponse.json({ success: true, data: user }, { status: 200 });
	} catch (error) {
		console.error("GET /api/profile error:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to fetch profile" },
			{ status: 500 },
		);
	}
}

// PATCH /api/profile - Updates current user's profile
export async function PATCH(request: NextRequest) {
	try {
		const body = await request.json();

		const { name, email, phoneNumber, address, accountType, profileImage } =
			body;

		// Validation
		if (!name || typeof name !== "string" || name.trim().length === 0) {
			return NextResponse.json(
				{ success: false, message: "Name is required" },
				{ status: 400 },
			);
		}

		if (
			!email ||
			typeof email !== "string" ||
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
		) {
			return NextResponse.json(
				{ success: false, message: "A valid email is required" },
				{ status: 400 },
			);
		}

		const existingUser = await prisma.user.findFirst();

		let updatedUser;

		if (existingUser) {
			updatedUser = await prisma.user.update({
				where: { id: existingUser.id },
				data: {
					name: name.trim(),
					email: email.trim().toLowerCase(),
					phoneNumber: phoneNumber?.trim() || null,
					address: address?.trim() || null,
					accountType: accountType?.trim() || "Individual",
					...(profileImage !== undefined && { profileImage }),
				},
			});
		} else {
			updatedUser = await prisma.user.create({
				data: {
					name: name.trim(),
					email: email.trim().toLowerCase(),
					phoneNumber: phoneNumber?.trim() || null,
					address: address?.trim() || null,
					accountType: accountType?.trim() || "Individual",
					profileImage: profileImage || null,
				},
			});
		}

		return NextResponse.json(
			{
				success: true,
				message: "Profile updated successfully",
				data: updatedUser,
			},
			{ status: 200 },
		);
	} catch (error: unknown) {
		console.error("PATCH /api/profile error:", error);

		// Prisma unique constraint
		if (
			error &&
			typeof error === "object" &&
			"code" in error &&
			(error as { code: string }).code === "P2002"
		) {
			return NextResponse.json(
				{
					success: false,
					message: "This email is already in use",
				},
				{ status: 409 },
			);
		}

		return NextResponse.json(
			{
				success: false,
				message: "Failed to update profile",
			},
			{ status: 500 },
		);
	}
}
