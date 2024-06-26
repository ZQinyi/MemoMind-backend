package com.me.controller;

import com.me.anno.Log;
import com.me.entity.Note;
import com.me.entity.Result;
import com.me.entity.SimpleNoteDto;
import com.me.service.NoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Slf4j
public class NoteController {

    @Autowired
    private NoteService noteService;

    @CrossOrigin(origins = "*")
    @GetMapping("/api/{userId}/notes")
    public Result list(@PathVariable Integer userId) {
        log.info("Get Notes by UserId");
        List<SimpleNoteDto> noteList = noteService.showSimpleNotes(userId);
        return Result.success(noteList);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/api/notes/{noteId}")
    public Result getNote(@PathVariable Integer noteId) {
        log.info("Get Notes by noteId:{}", noteId);
        Note note = noteService.findNote(noteId);
        return Result.success(note);
    }

    @CrossOrigin(origins = "*")
    @Log
    @DeleteMapping("/api/{userId}/notes/{noteId}")
    public Result deleteNote(@PathVariable Integer noteId, @PathVariable Integer userId) {
        log.info("{} delete note id: {}", userId, noteId);
        noteService.deletenote(noteId, userId);
        return Result.success();
    }

    @CrossOrigin(origins = "*")
    @Log
    @PostMapping("/api/{userId}/notes")
    public Result addNote(@PathVariable Integer userId) {
        log.info("{} adds a new note", userId);
        noteService.addNote(userId);
        return Result.success();
    }

    @CrossOrigin(origins = "*")
    @Log
    @PutMapping("/api/notes")
    public Result updateNote(@RequestBody Note note) {
        log.info("Updates the note {}", note);
        noteService.updateNote(note);
        return Result.success();
    }
}