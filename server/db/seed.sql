INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at) 
VALUES ('00000000-0000-0000-0000-000000000000', '5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'authenticated', 'authenticated', 'valencassa@gmail.com', '$2a$10$CS4fMVZTuVWCAaOkL.2xUuEaM1mSeVHmSnDS66uDjgFhDn0oey.mm', '2023-01-11 16:54:12.7991+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-01-11 16:54:12.801124+00', '{"provider": "google", "providers": ["google"]}', '{}', NULL, '2023-01-11 16:54:12.796822+00', '2023-01-11 16:54:12.80197+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO public.profiles (user_id, credits)
VALUES ('5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 100);

INSERT INTO public.conversations 
(id, user_id, name, model, messages, created_at, updated_at)
VALUES 
('c2d29867-3d0b-d497-9191-18a9d8ee7830', '5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'What do to in New York', 'gpt-4o', '[{"role": "user", "content": "Hi! I''m planning a trip to New York City and looking for some recommendations on things to do. What would you suggest?"}, {"role": "assistant", "content": "That sounds like an exciting trip! Are you interested in cultural activities, outdoor adventures, dining, or something else?"}]', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.usage
(id, chat_id, input, output, date, user_id)
VALUES
('c2d29867-3d0d-d497-9191-18a9d8ee7830', 'c2d29867-3d0b-d497-9191-18a9d8ee7830', 40, 80, '5/13/2024', '5e040c00-ce26-4f2f-8413-e0985ec1f4b2'),
('c2d29867-3d0d-d497-9191-18a9d8ee7230', 'c2d29867-3d0b-d497-9191-18a9d8ee7830', 40, 80, '5/12/2024', '5e040c00-ce26-4f2f-8413-e0985ec1f4b2');
