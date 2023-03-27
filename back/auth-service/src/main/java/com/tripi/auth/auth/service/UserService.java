package com.tripi.auth.auth.service;

import com.tripi.auth.auth.requests.RegisterRequest;
import com.tripi.auth.auth.model.User;
import com.tripi.auth.auth.model.UserDto;
import com.tripi.auth.auth.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    public User addUser(RegisterRequest request) {
        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(request.getPassword()));
        return userRepository.save(user);
    }

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
