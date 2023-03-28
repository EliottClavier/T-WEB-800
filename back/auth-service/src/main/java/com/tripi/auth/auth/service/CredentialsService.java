package com.tripi.auth.auth.service;

import com.tripi.auth.auth.exception.EmailAlreadyExistsException;
import com.tripi.auth.auth.exception.EmailDoesNotExistException;
import com.tripi.auth.auth.exception.CredentialsDoesNotExistsException;
import com.tripi.auth.auth.model.Credentials;
import com.tripi.auth.auth.model.CredentialsDto;
import com.tripi.auth.auth.repository.CredentialsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CredentialsService {


    CredentialsRepository credentialsRepository;

    private final ModelMapper modelMapper;

    @Autowired
    CredentialsService(CredentialsRepository credentialsRepository, ModelMapper modelMapper) {
        this.credentialsRepository = credentialsRepository;
        this.modelMapper = modelMapper;
    }

    public CredentialsDto convertToDto(Credentials credentials) {
        return modelMapper.map(credentials, CredentialsDto.class);
    }

    public Credentials convertToEntity(CredentialsDto credentialsDto) {
        return modelMapper.map(credentialsDto, Credentials.class);
    }

    public CredentialsDto saveCredentials(CredentialsDto credentialsDto) throws EmailAlreadyExistsException {
        Credentials credentials = credentialsRepository.saveNewCredentialsWithExceptions(convertToEntity(credentialsDto));
        return convertToDto(credentials);
    }

    public CredentialsDto getCredentialsByEmail(String email) throws EmailDoesNotExistException {
        return convertToDto(credentialsRepository.findByEmailWithExceptions(email));
    }

    public CredentialsDto getCredentialsById(Integer id) throws CredentialsDoesNotExistsException {
        return convertToDto(credentialsRepository.findById(id).orElseThrow(() -> new CredentialsDoesNotExistsException(id)));
    }

    public List<CredentialsDto> getAllCredentials() {
        return credentialsRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public CredentialsDto updateCredentials(CredentialsDto credentialsDto) throws CredentialsDoesNotExistsException, EmailAlreadyExistsException {
        Credentials credentials = convertToEntity(credentialsDto);
        Credentials credentialsToUpdate = credentialsRepository.findById(credentials.getId()).orElseThrow(() -> new CredentialsDoesNotExistsException(credentialsDto.getId()));
        if(credentialsRepository.existsByEmail(credentials.getEmail()) && !Objects.equals(credentialsToUpdate.getEmail(), credentials.getEmail())) {
            throw new EmailAlreadyExistsException(credentials.getEmail());
        }
        credentialsToUpdate.setEmail(credentials.getEmail());
        if (credentials.getPassword() != null) {
            credentialsToUpdate.setPassword(credentials.getPassword());
        }
        return convertToDto(credentialsRepository.save(credentialsToUpdate));
    }

    public void deleteCredentials(Integer id) throws CredentialsDoesNotExistsException {
        Credentials credentials = credentialsRepository.findById(id).orElseThrow(() -> new CredentialsDoesNotExistsException(id));
        credentialsRepository.delete(credentials);
    }
}
