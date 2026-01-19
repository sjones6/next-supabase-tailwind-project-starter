-- Example test file demonstrating RLS policy testing patterns
-- Copy and modify this file when testing your own tables

BEGIN;
SELECT plan(3);

-- ============================================================================
-- SETUP: Create test users
-- ============================================================================
SELECT tests.create_supabase_user('owner_user', 'owner@test.com');
SELECT tests.create_supabase_user('other_user', 'other@test.com');

-- ============================================================================
-- TEST: Authentication state management
-- ============================================================================

-- Test 1: Anon users should not have authenticated role
SELECT tests.clear_authentication();
SELECT isnt(
    current_setting('role'),
    'authenticated',
    'Anon user should not have authenticated role'
);

-- Test 2: Authenticated users should have correct role
SELECT tests.authenticate_as('owner_user');
SELECT is(
    current_setting('role'),
    'authenticated',
    'Authenticated user should have authenticated role'
);

-- Test 3: Service role should work
SELECT tests.authenticate_as_service_role();
SELECT is(
    current_setting('role'),
    'service_role',
    'Service role should be set correctly'
);

-- ============================================================================
-- CLEANUP: Rollback reverts all changes
-- ============================================================================

SELECT * FROM finish();
ROLLBACK;
