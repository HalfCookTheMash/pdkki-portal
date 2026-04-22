<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DataChangeResource\Pages;
use App\Models\DataChange;
use App\Models\Consultant;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DataChangeResource extends Resource
{
    protected static ?string $model = DataChange::class;

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

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Perubahan Data';
    protected static ?string $pluralModelLabel = 'Perubahan Data';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Group::make()->schema([
                Section::make('Biodata Konsultan')->schema([
                    TextInput::make('consultant_name')
                        ->label('Nama')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('consultant_number')
                        ->label('Nomor Konsultan')
                        ->required(),
                    TextInput::make('birth_place')
                        ->label('Tempat Lahir')
                        ->required(),
                    DatePicker::make('birth_date')
                        ->label('Tanggal Lahir')
                        ->required(),
                    TextInput::make('religion')
                        ->label('Agama')
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
                ])->columns(2),

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
                ]),

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
                    TextInput::make('email')
                        ->email(),
                ]),

                Section::make('Upload Data')->schema([
                    FileUpload::make('face_photo')
                        ->label('Pas Foto Baru')
                        ->image()
                        ->directory('data-changes/photos'),
                    FileUpload::make('signature')
                        ->label('Tanda Tangan')
                        ->image()
                        ->directory('data-changes/signatures'),
                ]),

                Textarea::make('changes_description')
                    ->label('Deskripsi Perubahan')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),

            ])->columnSpanFull()
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                SelectColumn::make('status')
                    ->label('Status')
                    ->options([
                        'pending'  => 'Menunggu',
                        'approved' => 'Disetujui',
                        'rejected' => 'Ditolak',
                    ])
                    ->selectablePlaceholder(false)
                    ->extraAttributes([
                        'class' => 'min-w-[150px]',
                    ]),
                TextColumn::make('consultant_name')
                    ->label('Nama')
                    ->searchable(),
                ImageColumn::make('face_photo')
                    ->label('Pas Foto'),
                TextColumn::make('consultant_number')
                    ->label('Nomor Konsultan')
                    ->sortable()
                    ->searchable(),
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
                TextColumn::make('changes_description')
                    ->label('Perubahan')
                    ->limit(50),
                TextColumn::make('created_at')
                    ->label('Tanggal Pengajuan')
                    ->date('d/m/Y')
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending'  => 'Menunggu',
                        'approved' => 'Disetujui',
                        'rejected' => 'Ditolak',
                    ]),
            ])
            ->actions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),
                    DeleteAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'pending')->count() ?: null;
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListDataChanges::route('/'),
            'create' => Pages\CreateDataChange::route('/create'),
            'view'   => Pages\ViewDataChange::route('/{record}'),
            'edit'   => Pages\EditDataChange::route('/{record}/edit'),
        ];
    }
}
