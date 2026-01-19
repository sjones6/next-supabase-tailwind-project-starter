-- Test file to verify the test infrastructure is working correctly
-- This tests the helper functions defined in 0000000000_tests.sql

BEGIN;
SELECT plan(6);

-- Test 1: Verify we can create a test user
SELECT lives_ok(
    $$ SELECT tests.create_supabase_user('test_user_1', 'test1@example.com') $$,
    'Should be able to create a test user'
);

-- Test 2: Verify we can retrieve the user we created
SELECT lives_ok(
    $$ SELECT tests.get_supabase_user('test_user_1') $$,
    'Should be able to get the test user'
);

-- Test 3: Verify we can get the user UUID
SELECT lives_ok(
    $$ SELECT tests.get_supabase_uid('test_user_1') $$,
    'Should be able to get the test user UUID'
);

-- Test 4: Verify we can authenticate as the test user
SELECT lives_ok(
    $$ SELECT tests.authenticate_as('test_user_1') $$,
    'Should be able to authenticate as the test user'
);

-- Test 5: Verify the authenticated role is set correctly
SELECT is(
    current_setting('role'),
    'authenticated',
    'Role should be authenticated after authenticate_as'
);

-- Test 6: Verify we can clear authentication
SELECT lives_ok(
    $$ SELECT tests.clear_authentication() $$,
    'Should be able to clear authentication'
);

SELECT * FROM finish();
ROLLBACK;
