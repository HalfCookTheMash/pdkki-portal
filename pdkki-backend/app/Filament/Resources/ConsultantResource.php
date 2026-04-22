<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ConsultantResource\Pages;
use App\Filament\Resources\ConsultantResource\RelationManagers;
use App\Models\Consultant;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ConsultantResource extends Resource
{
    protected static ?string $model = Consultant::class;

    protected static ?int $navigationSort = 1;

    protected static function provinsiOptions(): array
    {
        return [
            'Aceh' => 'Aceh',
            'Sumatera Utara' => 'Sumatera Utara',
            'Sumatera Barat' => 'Sumatera Barat',
            'Riau' => 'Riau',
            'Kepulauan Riau' => 'Kepulauan Riau',
            'Jambi' => 'Jambi',
            'Bengkulu' => 'Bengkulu',
            'Sumatera Selatan' => 'Sumatera Selatan',
            'Kepulauan Bangka Belitung' => 'Kepulauan Bangka Belitung',
            'Lampung' => 'Lampung',
            'DKI Jakarta' => 'DKI Jakarta',
            'Banten' => 'Banten',
            'Jawa Barat' => 'Jawa Barat',
            'Jawa Tengah' => 'Jawa Tengah',
            'DI Yogyakarta' => 'DI Yogyakarta',
            'Jawa Timur' => 'Jawa Timur',
            'Bali' => 'Bali',
            'Nusa Tenggara Barat' => 'Nusa Tenggara Barat',
            'Nusa Tenggara Timur' => 'Nusa Tenggara Timur',
            'Kalimantan Barat' => 'Kalimantan Barat',
            'Kalimantan Tengah' => 'Kalimantan Tengah',
            'Kalimantan Selatan' => 'Kalimantan Selatan',
            'Kalimantan Timur' => 'Kalimantan Timur',
            'Kalimantan Utara' => 'Kalimantan Utara',
            'Sulawesi Utara' => 'Sulawesi Utara',
            'Gorontalo' => 'Gorontalo',
            'Sulawesi Tengah' => 'Sulawesi Tengah',
            'Sulawesi Barat' => 'Sulawesi Barat',
            'Sulawesi Selatan' => 'Sulawesi Selatan',
            'Sulawesi Tenggara' => 'Sulawesi Tenggara',
            'Maluku' => 'Maluku',
            'Maluku Utara' => 'Maluku Utara',
            'Papua' => 'Papua',
            'Papua Barat' => 'Papua Barat',
            'Papua Tengah' => 'Papua Tengah',
            'Papua Pegunungan' => 'Papua Pegunungan',
            'Papua Selatan' => 'Papua Selatan',
            'Papua Barat Daya' => 'Papua Barat Daya',
        ];
    }

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Konsultan';
    protected static ?string $pluralModelLabel = 'Konsultan';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()->schema([
                    Section::make('Biodata Konsultan')->schema([
                        TextInput::make('name')
                            ->label('Nama')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('consultant_id')
                            ->label('Nomor Konsultan')
                            ->required(),
                        DatePicker::make('registered_date')
                            ->label('Tanggal Terdaftar')
                            ->required(),
                        TextInput::make('birth_place')
                            ->label('Tempat Lahir')
                            ->required(),
                        DatePicker::make('birth_date')
                            ->label('Tanggal Lahir')
                            ->required(),
                        Select::make('gender')
                            ->label('Jenis Kelamin')
                            ->required()
                            ->native(false)
                            ->selectablePlaceholder(false)
                            ->placeholder('Pilih Jenis Kelamin')
                            ->options([
                                'male' => 'Laki-Laki',
                                'female' => 'Perempuan'
                            ]),
                        TextInput::make('religion')
                            ->label('Agama')
                            ->required(),
                        TextInput::make('id_number')
                            ->label('NIK')
                            ->required()
                            ->mask('9999999999999999')
                            ->regex('/^[0-9]{16}$/')
                            ->validationMessages([
                                'regex' => 'NIK harus tepat 16 digit angka.'
                            ]),
                        TextInput::make('email')
                            ->email(),
                        ToggleButtons::make('status')
                            ->required()
                            ->inline()
                            ->default('active')
                            ->options([
                                'active' => 'Aktif',
                                'inactive' => 'Tidak Aktif'
                            ])
                            ->colors([
                                'active' => 'success',
                                'inactive' => 'danger'
                            ])
                            ->live(),

                        Textarea::make('inactive_reason')
                            ->label('Alasan Tidak Aktif')
                            ->placeholder('Jelaskan alasan konsultan tidak aktif...')
                            ->rows(3)
                            ->visible(fn(Get $get) => $get('status') === 'inactive')
                            ->required(fn(Get $get) => $get('status') === 'inactive'),

                        FileUpload::make('inactive_document')
                            ->label('Dokumen Pendukung')
                            ->helperText('Upload surat keputusan atau dokumen pendukung lainnya')
                            ->directory('inactive-documents')
                            ->acceptedFileTypes(['application/pdf', 'image/*'])
                            ->visible(fn(Get $get) => $get('status') === 'inactive'),

                        FileUpload::make('face_photo')
                            ->required()
                            ->image()
                            ->columnSpanFull()
                            ->directory('face_photo'),
                    ])->columns(2),

                    Section::make('Data Rumah')->schema([
                        Textarea::make('home_address')
                            ->label('Alamat Rumah')
                            ->required()
                            ->columnSpanFull(),
                        TextInput::make('home_phone')
                            ->label('Nomor Telepon Rumah')
                            ->required()
                            ->mask('999999999999999')
                            ->regex('/^[0-9]{8,15}$/')
                            ->validationMessages([
                                'regex' => 'Nomor telepon harus 8-15 digit angka.'
                            ]),
                        TextInput::make('personal_phone')
                            ->label('Nomor Telepon Pribadi')
                            ->required()
                            ->mask('999999999999999')
                            ->regex('/^[0-9]{8,15}$/')
                            ->validationMessages([
                                'regex' => 'Nomor telepon harus 8-15 digit angka.'
                            ]),
                    ]),

                    Section::make('Data Firma Hukum')->schema([
                        TextInput::make('law_firm')
                            ->label('Nama Firma Hukum')
                            ->required(),
                        Textarea::make('law_firm_address')
                            ->label('Alamat Firma Hukum')
                            ->required()
                            ->columnSpanFull(),
                        Select::make('law_firm_province')
                            ->label('Provinsi')
                            ->required()
                            ->searchable()
                            ->placeholder(null)
                            ->options(self::provinsiOptions()),
                        TextInput::make('law_firm_city')
                            ->label('Kota')
                            ->required(),
                        TextInput::make('law_firm_phone')
                            ->label('Nomor Telepon (Firma Hukum)')
                            ->required()
                            ->mask('999999999999999')
                            ->regex('/^[0-9]{8,15}$/')
                            ->validationMessages([
                                'regex' => 'Nomor telepon harus 8-15 digit angka.'
                            ]),
                    ])->columns(2),

                    Section::make('Data Korespondensi')->schema([
                        Textarea::make('correspondence_address')
                            ->label('Alamat Korespondensi'),
                        Select::make('correspondence_province')
                            ->label('Provinsi')
                            ->searchable()
                            ->placeholder(null)
                            ->options(self::provinsiOptions()),
                        TextInput::make('correspondence_city')
                            ->label('Kota'),
                        TextInput::make('correspondence_postal_code')
                            ->label('Kode Pos'),
                        TextInput::make('correspondence_phone')
                            ->label('Nomor Telepon')
                            ->mask('999999999999999')
                            ->regex('/^[0-9]{8,15}$/')
                            ->validationMessages([
                                'regex' => 'Nomor telepon harus 8-15 digit angka.'
                            ]),
                    ]),

                ])->columnSpanFull()

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable(),
                ImageColumn::make('face_photo')
                    ->label('Pas Foto'),
                TextColumn::make('consultant_id')
                    ->label('Nomor Konsultan')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->searchable()
                    ->sortable()
                    ->formatStateUsing(fn(string $state): string => match ($state) {
                        'active' => 'Aktif',
                        'inactive' => 'Tidak Aktif',
                    })
                    ->color(fn(string $state): string => match ($state) {
                        'active' => 'success',
                        'inactive' => 'danger'
                    }),
                TextColumn::make('law_firm')
                    ->label('Firma Hukum')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('law_firm_address')
                    ->label('Alamat Firma Hukum')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),
                    DeleteAction::make(),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelationManagers(): array
    {
        return [
            RelationManagers\EducationRelationManager::class,
            RelationManagers\AchievementsRelationManager::class,
            RelationManagers\ViolationsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListConsultants::route('/'),
            'create' => Pages\CreateConsultant::route('/create'),
            'edit' => Pages\EditConsultant::route('/{record}/edit'),
            'view' => Pages\ViewConsultant::route('/{record}'),
        ];
    }
}
