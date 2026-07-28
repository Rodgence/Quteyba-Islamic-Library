<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'view opportunities', 'create opportunities', 'edit opportunities', 'delete opportunities',
            'publish opportunities', 'feature opportunities',
            'view pages', 'create pages', 'edit pages', 'delete pages',
            'view services', 'create services', 'edit services', 'delete services',
            'view courses', 'create courses', 'edit courses', 'delete courses',
            'view categories', 'create categories', 'edit categories', 'delete categories',
            'view countries', 'create countries', 'edit countries', 'delete countries',
            'view testimonials', 'create testimonials', 'edit testimonials', 'delete testimonials',
            'view media', 'upload media', 'delete media',
            'view menus', 'manage menus',
            'view redirects', 'manage redirects',
            'view contact messages', 'manage contact messages',
            'view service requests', 'manage service requests',
            'view subscribers', 'manage subscribers',
            'view users', 'create users', 'edit users', 'delete users',
            'view roles', 'manage roles',
            'view settings', 'manage settings',
            'view seo', 'manage seo',
            'import wordpress',
            'access admin',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
        $superAdmin->syncPermissions(Permission::all());

        $admin = Role::firstOrCreate(['name' => 'Administrator', 'guard_name' => 'web']);
        $admin->syncPermissions(Permission::where('name', 'not like', '%roles%')
            ->where('name', 'not like', '%delete users%')
            ->where('name', 'not like', '%manage settings%')
            ->get());

        $editor = Role::firstOrCreate(['name' => 'Editor', 'guard_name' => 'web']);
        $editor->syncPermissions([
            'view opportunities', 'create opportunities', 'edit opportunities',
            'view pages', 'create pages', 'edit pages',
            'view services', 'create services', 'edit services',
            'view courses', 'create courses', 'edit courses',
            'view categories', 'view countries',
            'view testimonials', 'create testimonials', 'edit testimonials',
            'view media', 'upload media',
            'view contact messages',
            'view service requests',
            'access admin',
        ]);
    }
}
