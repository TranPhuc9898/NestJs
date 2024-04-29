import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import 'dotenv/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      scope: ['email', 'public_profile', 'user_birthday', 'user_relationships'], // Thêm user_birthday và user_relationships vào scope
      profileFields: [
        'emails',
        'name',
        'picture.type(large)',
        'gender',
        'birthday',
        'relationship_status',
      ], // Thêm birthday và relationship_status vào profileFields
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { name, emails, picture, gender, birthday, relationship_status } =
      profile;

    const user = {
      email: emails?.[0]?.value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      avatar: picture?.data?.url,
      gender: gender,
      birthday: birthday, // Thêm trường birthday
      relationshipStatus: relationship_status, // Thêm trường relationship_status
    };

    done(null, user);
  }
}
