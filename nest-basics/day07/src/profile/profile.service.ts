import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateProfileDto } from './dto/CreateProfileDto';
import { UpdateProfileDto } from './dto/UpdateProfileDto';

@Injectable()
export class ProfileService {
    private profiles = new Map<number, { userId: number; bio: string; userName: string }>();
    constructor(private userService: UserService) { }

    createProfile(data: CreateProfileDto) {
        const profile = {
            userId: data.userId,
            bio: data.bio,
            userName: data.userName,
        };
        const existingProfile = Array.from(this.profiles.values()).find(profile => profile.userId === data.userId);
        if (existingProfile) {
            throw new ConflictException('Profile with this userId already exists');
        }
        const userNameExists = Array.from(this.profiles.values()).find(profile => profile.userName === data.userName);
        if (userNameExists) {
            throw new ConflictException('Profile with this userName already exists');
        }
        const user = this.userService.findUserById(data.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        this.profiles.set(profile.userId, profile);
        return profile;
    }

    findProfileById(id: number) {
        const profile = this.profiles.get(id);
        if (!profile) {
            throw new NotFoundException('Profile not found');
        };
        const user = this.userService.findUserById(profile.userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return { ...profile, user };
    }
    getAllProfiles() {
        return Array.from(this.profiles.values());
    }
    updateProfile(id: number, data: UpdateProfileDto) {
        const profile = this.profiles.get(id);
        if (!profile) {
            throw new NotFoundException('Profile not found');
        };
        this.profiles.set(id, { ...profile, ...data });
        return this.profiles.get(id);
    }
    deleteProfile(id: number) {
        const profile = this.profiles.get(id);
        if (!profile) {
            throw new NotFoundException('Profile not found');
        };
        this.profiles.delete(id);
        return profile;
    }
    getUserProfile(userId: number) {
        const profile = Array.from(this.profiles.values()).find(profile => profile.userId === userId);
        if (!profile) {
            throw new NotFoundException('Profile not found for this userId');
        };
        const user = this.userService.findUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        };
        return { ...profile, user };
    }
}