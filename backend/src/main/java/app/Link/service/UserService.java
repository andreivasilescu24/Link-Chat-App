package app.Link.service;

import app.Link.model.User;
import app.Link.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository repository;

    public User registerUser(User user) {
        return repository.save(user);
    }

    public User authenticateUser(String username, String password) {
        User user = repository.findByUsername(username).orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public void saveUser(User user) {
        repository.save(user);
    }

    public void disconnect(User user) {
        repository.findByUsername(user.getUsername()).ifPresent(storedUser -> repository.save(storedUser));
    }

    public List<User> findUsers() {
        return repository.findAll();
    }
}
