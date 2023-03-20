package com.tripi.back.auth.service;

import com.tripi.back.auth.entity.user.User;
import com.tripi.back.auth.entity.user.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private ModelMapper modelMapper() {
        return new ModelMapper();
    }

    public UserDto convertToDto(User user) {
        return modelMapper().map(user, UserDto.class);
    }

    public User convertToEntity(UserDto userDto) {
        return modelMapper().map(userDto, User.class);
    }
}
