import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/CreateProfileDto';
import { UpdateProfileDto } from './dto/UpdateProfileDto';

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
    @Get(':id')
    getProfileById(@Param('id') id: string) {
        return this.profileService.findProfileById(+id);
    }
    @Get()
    getProfiles() {
        return this.profileService.getAllProfiles();
    }

    @Post()
    createProfile(@Body() body: CreateProfileDto) {
        return this.profileService.createProfile(body);
    }

    @Put(':id')
    updateProfile(@Param('id') id: string, @Body() body: UpdateProfileDto) {
        return this.profileService.updateProfile(+id, body);
    }

    @Delete(':id')
    deleteProfile(@Param('id') id: string) {
        return this.profileService.deleteProfile(+id);
    }
}
